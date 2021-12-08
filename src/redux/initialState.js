export const initialState = {
  bicycles: {
    data: [
      {
        id: 1,
        title: 'Torpedo 230',
        description: 'Lorem ipsum dolom mites',
        image: 'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?cs=srgb&dl=pexels-leandro-boogalu-1149601.jpg&fm=jpg',
        promo: 'sale',
        price: 2300,
        oldPrice: 1800,
        category: 'road bike',
        quantity: 1,
      },
      {
        id: 2,
        title: 'Saturn 3000',
        description: 'Dolores pomidores amores',
        image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?cs=srgb&dl=pexels-philipp-m-100582.jpg&fm=jpg',
        promo: 'sale',
        price: 4800,
        oldPrice: 3800,
        category: 'mountain bike',
        quantity: 1,
        moreImage: [
          {
            id: 1,
            image: '',
          },
          {
            id: 2,
            image: '',
          },
          {
            id: 3,
            image: '',
          },
        ],
      },
      {
        id: 3,
        title: 'Axel 34',
        description: 'Como esta noche bravo',
        image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?cs=srgb&dl=pexels-pixabay-276517.jpg&fm=jpg',
        promo: null,
        price: 1700,
        category: 'road bike',
        quantity: 1,
        moreImage: [
          {
            id: 1,
            image: 'https://images.pexels.com/photos/5911709/pexels-photo-5911709.jpeg?cs=srgb&dl=pexels-cottonbro-5911709.jpg&fm=jpg',
          },
          {
            id: 2,
            image: 'https://images.pexels.com/photos/5911702/pexels-photo-5911702.jpeg?cs=srgb&dl=pexels-cottonbro-5911702.jpg&fm=jpg',
          },
          {
            id: 3,
            image: 'https://images.pexels.com/photos/5914907/pexels-photo-5914907.jpeg?cs=srgb&dl=pexels-cottonbro-5914907.jpg&fm=jpg',
          },
        ],
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  cart: {
    products: [
      {
        id: 3,
        title: 'Axel 34',
        description: 'Como esta noche bravo',
        image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?cs=srgb&dl=pexels-pixabay-276517.jpg&fm=jpg',
        promo: null,
        price: 1700,
        category: 'road bike',
        quantity: 1,
      },
    ],
  },
};
