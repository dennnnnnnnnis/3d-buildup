import { OakBed, PlatformBed, UpholsteredBed } from './BedVariants'
import Chair, { RedChair, BlueChair } from './Chair'
import { DarkDresser, WhiteDresser, BedsideTable } from './Dresser'
import Desk from './desk'
import Bed from './Bed'
import useFurnitureStore from '../stores/furniture'

const FurnitureRenderer = () => {
  const furnitureItems = useFurnitureStore(state => state.furnitureItems)
  
  const getFurnitureComponent = (type) => {
    switch (type) {
      case 'oak-bed':
        return OakBed
      case 'platform-bed':
        return PlatformBed
      case 'chair':
        return Chair
      case 'red-chair':
        return RedChair
      case 'blue-chair':
        return BlueChair
      case 'dresser-dark':
        return DarkDresser
      case 'dresser-white':
        return WhiteDresser
      case 'bedside-table':
        return BedsideTable
      case 'desk':
        return Desk
      case 'bed':
        return Bed
      default:
        return OakBed // fallback
    }
  }
  
  return (
    <>
      {furnitureItems.map((item) => {
        const FurnitureComponent = getFurnitureComponent(item.type)
        return (
          <FurnitureComponent
            key={item.id}
            position={item.position}
            rotation={item.rotation}
          />
        )
      })}
    </>
  )
}

export default FurnitureRenderer
