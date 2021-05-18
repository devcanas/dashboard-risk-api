import mongoose from 'mongoose'

const menusSchema = new mongoose.Schema({
  mapLocationMenu: [
    {
      name: String,
      coordinates: { lat: Number, long: Number },
    },
  ],
  infoSourceMenu: [
    {
      name: String,
      description: String,
      displayUpperBoundOnly: Boolean,
      intervals: [
        {
          interval: { upperBound: Number, lowerBound: Number },
          asString: Boolean,
          color: {
            primary: String,
            secondary: String,
          },
        },
      ],
    },
  ],
})

const Menu = mongoose.model('Menu', menusSchema, 'menus')
export { Menu }
