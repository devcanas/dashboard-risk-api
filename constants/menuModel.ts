export default {
  defaultSelectionState: {
    selectedInfoSourceId: 'risco',
    selectedMapLocationId: 'continente',
  },
  infoSourceMenu: [
    {
      id: 'risco',
      name: 'Risco',
      description: 'Por 100.000 habitantes',
      intervals: [
        {
          upperBound: Number.MAX_SAFE_INTEGER,
          lowerBound: 900,
          asString: '900+',
          color: { primary: '#fde725', secondary: '#ffffff' },
        },
        {
          upperBound: 900,
          lowerBound: 800,
          asString: '800 - 900',
          color: { primary: '#b8de29', secondary: '#ffffff' },
        },
        {
          upperBound: 800,
          lowerBound: 700,
          asString: '700 - 800',
          color: { primary: '#73d055', secondary: '#ffffff' },
        },
        {
          upperBound: 700,
          lowerBound: 600,
          asString: '600 - 700',
          color: { primary: '#3cbb75', secondary: '#ffffff' },
        },
        {
          upperBound: 600,
          lowerBound: 500,
          asString: '500 - 600',
          color: { primary: '#20a387', secondary: '#deebf7' },
        },
        {
          upperBound: 500,
          lowerBound: 400,
          asString: '400 - 500',
          color: { primary: '#238a8d', secondary: '#9ecae1' },
        },
        {
          upperBound: 400,
          lowerBound: 300,
          asString: '300 - 400',
          color: { primary: '#2d708e', secondary: '#4291c6' },
        },
        {
          upperBound: 300,
          lowerBound: 200,
          asString: '200 - 300',
          color: { primary: '#39568c', secondary: '#08529c' },
        },
        {
          upperBound: 200,
          lowerBound: 100,
          asString: '100 - 200',
          color: { primary: '#453781', secondary: '#08306b' },
        },
        {
          upperBound: 100,
          lowerBound: 0,
          asString: '0 - 100',
          color: { primary: '#481567', secondary: '#08306b' },
        },
      ],
    },
    {
      id: 'incerteza',
      name: 'Incerteza',
      description: 'Por 100.000 habitantes',
      intervals: [
        {
          upperBound: Number.MAX_SAFE_INTEGER,
          lowerBound: 900,
          asString: '900+',
          color: { primary: '#fde725', secondary: '#ffffff' },
        },
        {
          upperBound: 900,
          lowerBound: 800,
          asString: '800 - 900',
          color: { primary: '#b8de29', secondary: '#ffffff' },
        },
        {
          upperBound: 800,
          lowerBound: 700,
          asString: '700 - 800',
          color: { primary: '#73d055', secondary: '#ffffff' },
        },
        {
          upperBound: 700,
          lowerBound: 600,
          asString: '600 - 700',
          color: { primary: '#3cbb75', secondary: '#ffffff' },
        },
        {
          upperBound: 600,
          lowerBound: 500,
          asString: '500 - 600',
          color: { primary: '#20a387', secondary: '#deebf7' },
        },
        {
          upperBound: 500,
          lowerBound: 400,
          asString: '400 - 500',
          color: { primary: '#238a8d', secondary: '#9ecae1' },
        },
        {
          upperBound: 400,
          lowerBound: 300,
          asString: '300 - 400',
          color: { primary: '#2d708e', secondary: '#4291c6' },
        },
        {
          upperBound: 300,
          lowerBound: 200,
          asString: '200 - 300',
          color: { primary: '#39568c', secondary: '#08529c' },
        },
        {
          upperBound: 200,
          lowerBound: 100,
          asString: '100 - 200',
          color: { primary: '#453781', secondary: '#08306b' },
        },
        {
          upperBound: 100,
          lowerBound: 0,
          asString: '0 - 100',
          color: { primary: '#481567', secondary: '#08306b' },
        },
      ],
    },
    {
      id: 'sah',
      name: 'Stay @ Home',
      description: '',
      intervals: [
        {
          upperBound: 1000,
          lowerBound: 800,
          asString: '> 70%',
          color: { primary: '#481567', secondary: '#481567' },
        },
        {
          upperBound: 1000,
          lowerBound: 800,
          asString: '60% - 70%',
          color: { primary: '#39568c', secondary: '#39568c' },
        },
        {
          upperBound: 1000,
          lowerBound: 800,
          asString: '50% - 70%',
          color: { primary: '#238a8d', secondary: '#238a8d' },
        },
        {
          upperBound: 1000,
          lowerBound: 800,
          asString: '40 - 50%',
          color: { primary: '#3cbb75', secondary: '#3cbb75' },
        },
        {
          upperBound: 1000,
          lowerBound: 800,
          asString: '< 40%',
          color: { primary: '#b8de29', secondary: '#b8de29' },
        },
      ],
    },
  ],
  mapLocationMenu: [
    {
      id: 'continente',
      name: 'Continente',
      coordinates: {
        lat: 39.56827914916011,
        long: -9.469218750000001,
        zoom: 7,
      },
    },
    {
      id: 'acores',
      name: 'Açores',
      coordinates: {
        lat: 38.51378825,
        long: -27.90527343,
        zoom: 8,
      },
    },
    {
      id: 'madeira',
      name: 'Madeira',
      coordinates: {
        lat: 32.76071688,
        long: -16.60034179,
        zoom: 10,
      },
    },
  ],
}
