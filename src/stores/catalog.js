const items = {
    furniture: [
        {
            id: 'sectional',
            name: 'Mallory Sectional',
            category: 'seating',
            image: '/covers/mallory.png',
            model: '/models/Mallory Tufted Upholstered Sectional.glb',
            scale: 1,
            defaultPosition: [0, 0, 0]
        },
        {
            id: 'hunyuan-sofa',
            name: 'Hunyuan Sofa',
            category: 'seating',
            image: '/covers/hunyuan.png',
            model: '/models/VLS005-Hunyuan-texture.glb',
            scale: 1,
            defaultPosition: [0, 0, 0]
        }
    ]
}

const textures = {
    oak: {
        id: 'oak',
        name: '橡木面板',
        texture: {
            map: '/textures/oak_veneer_01_diff_1k.jpg',
        }
    },
    plywood: {
        id: 'plywood',
        name: '合成木板',
        texture: {
            map: '/textures/plywood_diff_1k.jpg',
        }
    },
    rosewood: {
        id: 'rosewood',
        name: '红木面板',
        texture: {
            map: '/textures/rosewood_veneer1_diff_1k.jpg',
        }
    },
    carbon: {
        id: 'carbon',
        name: '碳纤维面板',
        texture: {
            map: '/textures/carbon-fiber_metallic.png',
        }
    },
    walnut: {
        id: 'walnut',
        name: '胡桃木面板',
        texture: {
            map: '/textures/walnut_diff_1k.jpg',
        }
    },
    
}

export { items, textures };
export default textures;