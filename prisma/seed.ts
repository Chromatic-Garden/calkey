import { Prisma, PrismaClient } from "@prisma/client"

const pb = new PrismaClient()
const p = pb.$extends({
  name: "createManyAndReturn",
  model: {
    $allModels: {
      createManyRet: async function<
          T, A, B extends Prisma.Args<T, "create">["data"][]>(
          this: T, data: Prisma.Exact<A, [...B]>) {
        return pb.$transaction((data as any).map((x: any) =>
          (Prisma.getExtensionContext(this) as any).create({ data: x }))) as
            Promise<{ [K in keyof B]: Prisma.Result<T, A, "create"> }>
      }
    }
  }
})

const map = <const T extends any[]>(arr: [...T]) =>
  <U>(fn: (arg: T[number]) => U) =>
    arr.map(fn) as { [K in keyof T]: U }

async function main() {
  await p.binReason.deleteMany({})
  await p.binReason.createManyRet(map([
    "Expired",
    "Unwanted",
  ])(name => ({ name })))

  await p.mealType.deleteMany({})
  await p.mealType.createManyRet(map([
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
    "Drink",
  ])(name => ({ name })))

  await p.nutrientType.deleteMany({})
  const [
    macro,
    micro,
  ] = await p.nutrientType.createManyRet(map([
    "Macro",
    "Micro",
  ])((name => ({ name }))))
  
  await p.nutrient.deleteMany({})
  const mkNuts = p.nutrient.createManyRet.bind(p.nutrient)

  const [
    calorie_,
    carbohydrate,
    protein,
    cholesterol,
    fat,
    water,
    vitamin,
    mineral,
  ] = await p.nutrient.createManyRet(map([
    [macro, "Calorie"],
    [macro, "Carbohydrate"],
    [macro, "Protein"],
    [macro, "Cholesterol"],
    [macro, "Fat"],
    [macro, "Water"],
    [micro, "Vitamin"],
    [micro, "Mineral"],
  ])(([{ id: typeId }, name]) =>
    ({ parentId: null, typeId, name })))

  await p.nutrient.createManyRet(map([
    [carbohydrate, macro, "Fiber"],
    [carbohydrate, macro, "Sugar"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))

  const [
    fiber,
    sugar,
  ] = await p.nutrient.createManyRet(map([
    [carbohydrate, macro, "Fiber"],
    [carbohydrate, macro, "Sugar"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))

  await p.nutrient.createManyRet(map([
    [sugar, macro, "Glucose"],
    [sugar, macro, "Sucrose"],
    [sugar, macro, "Fructose"],
    [sugar, macro, "Lactose"],
    [sugar, macro, "Galactose"],
    [sugar, macro, "Maltose"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))

  const [
    saturatedFat,
    transFat,
    unsaturatedFat,
  ] = await p.nutrient.createManyRet(map([
    [fat, macro, "Saturated Fat"],
    [fat, macro, "Trans Fat"],
    [fat, macro, "Unsaturated Fat"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))
  
  await p.nutrient.createManyRet(map([
    [unsaturatedFat, macro, "Polyunsaturated Fat"],
    [unsaturatedFat, macro, "Monounsaturated Fat"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))
  
  await p.nutrient.createManyRet(map([
    [vitamin, micro, "Vitamin A"],
    [vitamin, micro, "Vitamin B"],
    [vitamin, micro, "Vitamin B"],
    [vitamin, micro, "Vitamin B6"],
    [vitamin, micro, "Vitamin B12"],
    [vitamin, micro, "Vitamin C"],
    [vitamin, micro, "Vitamin D"],
    [vitamin, micro, "Vitamin E"],
    [vitamin, micro, "Vitamin K"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))
  
  await p.nutrient.createManyRet(map([
    [mineral, micro, "Sodium"],
    [mineral, micro, "Magnesium"],
    [mineral, micro, "Potassium"],
    [mineral, micro, "Calcium"],
    [mineral, micro, "Zinc"],
  ])(([{ id: parentId }, { id: typeId }, name]) =>
    ({ parentId, typeId, name })))
  
  const [
    length,
    area,
    volume,
    mass,
    energy,
    temperature,
    time,
    amount,
  ] = await p.unitType.createManyRet(map([
    "Length",
    "Area",
    "Volume",
    "Mass",
    "Energy",
    "Temperature",
    "Time",
    "Amount",
  ])((name => ({ name }))))

  const [
    metric,
    britishImperial,
    usCustomary,
  ] = await p.unitSystem.createManyRet(map([
    "Metric",
    "British Imperial",
    "US Customary",
  ])((name => ({ name }))))

  const [
    millimeter,
    centimeter,
    meter,
    kilometer,
    mil,
    inch,
    foot,
    yard,
    mile,
    squareMillimeter,
    squareCentimeter,
    squareMeter,
    squareKilometer,
    hectare,
    squareInch,
    squareFoot,
    squareYard,
    squareMile,
    acre,
    milliliter,
    centiliter,
    deciliter,
    liter,
    teaspoon,
    tablespoon,
    cup,
    shot,
    fluidOunce,
    pint,
    quart,
    gallon,
    microgram,
    milligram,
    gram,
    kilogram,
    ounce,
    pound,
    stone,
    calorie,
    joule,
    kilojoule,
    celsius,
    fahrenheit,
    second,
    minute,
    hour,
    day,
    week,
    month,
    year,
    pieces,
  ] = await p.unit.createManyRet(map([
    ["Millimeter", "mm"],
    ["Centimeter", "cm"],
    ["Meter", "m"],
    ["Kilometer", "km"],
    ["Mil", "mil"],
    ["Inch", "in"],
    ["Foot", "ft"],
    ["Yard", "yd"],
    ["Mile", "mi"],
    ["Square Millimeter", "mm^2"],
    ["Square Centimeter", "cm^2"],
    ["Square Meter", "m^2"],
    ["Square Kilometer", "km^2"],
    ["Hectare", "ha"],
    ["Square Inch", "sq in"],
    ["Square Foot", "sq ft"],
    ["Square Yard", "sq yd"],
    ["Square Mile", "sq mi"],
    ["Acre", "acre"],
    ["Milliliter", "ml"],
    ["Centiliter", "cl"],
    ["Deciliter", "dl"],
    ["Liter", "L"],
    ["Teaspoon", "tsp"],
    ["Tablespoon", "tbsp"],
    ["Cup", "c"],
    ["Shot", "shot"],
    ["Fluid Ounce", "fl oz"],
    ["Pint", "pt"],
    ["Quart", "qt"],
    ["Gallon", "gal"],
    ["Microgram", "ug"],
    ["Milligram", "mg"],
    ["Gram", "g"],
    ["Kilogram", "kg"],
    ["Ounce", "oz"],
    ["Pound", "lb"],
    ["Stone", "st"],
    ["Calorie", "kcal"],
    ["Joule", "J"],
    ["Kilojoule", "kJ"],
    ["Celsius", "C"],
    ["Fahrenheit", "F"],
    ["Second", "s"],
    ["Minute", "m"],
    ["Hour", "h"],
    ["Day", "d"],
    ["Week", "w"],
    ["Month", "m"],
    ["Year", "y"],
    ["Pieces", "pcs"],
  ])((([name, symbol]) =>
    ({ name, symbol }))))

  await p.unitSystemUnit.createManyRet(map([
    [millimeter, metric, length, 0.001],
    [centimeter, metric, length, 0.01],
    [meter, metric, length, 1],
    [kilometer, metric, length, 1000],
    [squareMillimeter, metric, area, 0.000001],
    [squareCentimeter, metric, area, 0.0001],
    [squareMeter, metric, area, 1],
    [squareKilometer, metric, area, 1000000],
    [hectare, metric, area, 10000],
    [milliliter, metric, volume, 0.001],
    [centiliter, metric, volume, 0.01],
    [deciliter, metric, volume, 0.1],
    [liter, metric, volume, 1],
    [teaspoon, metric, volume, 0.005],
    [tablespoon, metric, volume, 0.015],
    [cup, metric, volume, 250],
    [shot, metric, volume, 0.025],
    [microgram, metric, mass, 0.000001],
    [milligram, metric, mass, 0.001],
    [gram, metric, mass, 1],
    [kilogram, metric, mass, 1],
    [calorie, metric, energy, 4184],
    [joule, metric, energy, 1],
    [kilojoule, metric, mass, 1000],
    [celsius, metric, temperature, 1],
    [second, metric, time, 1],
    [minute, metric, time, 60],
    [hour, metric, time, 3600],
    [day, metric, time, 86400],
    [week, metric, time, 604800],
    [month, metric, time, 2629756.8],
    [year, metric, time, 31556952],
    [pieces, metric, amount, 1],
    [mil, britishImperial, length, 0.001],
    [inch, britishImperial, length, 1],
    [foot, britishImperial, length, 12],
    [yard, britishImperial, length, 36],
    [mile, britishImperial, length, 63360],
    [squareInch, britishImperial, area, 1],
    [squareFoot, britishImperial, area, 144],
    [squareYard, britishImperial, area, 1296],
    [squareMile, britishImperial, area, 4014489599.4792],
    [acre, britishImperial, area, 6272640],
    [fluidOunce, britishImperial, volume, 1],
    [pint, britishImperial, volume, 20],
    [quart, britishImperial, volume, 40],
    [gallon, britishImperial, volume, 160],
    [teaspoon, britishImperial, volume, 0.20833333333],
    [tablespoon, britishImperial, volume, 0.625],
    [cup, britishImperial, volume, 10],
    [shot, britishImperial, volume, 1.5],
    [ounce, britishImperial, mass, 1],
    [pound, britishImperial, mass, 16],
    [stone, britishImperial, mass, 224],
    [calorie, britishImperial, energy, 4184],
    [joule, britishImperial, energy, 1],
    [kilojoule, britishImperial, mass, 1000],
    [fahrenheit, britishImperial, temperature, 1],
    [second, britishImperial, time, 1],
    [minute, britishImperial, time, 60],
    [hour, britishImperial, time, 3600],
    [day, britishImperial, time, 86400],
    [week, britishImperial, time, 604800],
    [month, britishImperial, time, 2629756.8],
    [year, britishImperial, time, 31556952],
    [pieces, britishImperial, amount, 1],
    [mil, usCustomary, length, 0.001],
    [inch, usCustomary, length, 1],
    [foot, usCustomary, length, 12],
    [yard, usCustomary, length, 36],
    [mile, usCustomary, length, 63360],
    [squareInch, usCustomary, area, 1],
    [squareFoot, usCustomary, area, 144],
    [squareYard, usCustomary, area, 1296],
    [squareMile, usCustomary, area, 4014489599.4792],
    [acre, usCustomary, area, 6272640],
    [fluidOunce, usCustomary, volume, 1],
    [pint, usCustomary, volume, 16],
    [quart, usCustomary, volume, 32],
    [gallon, usCustomary, volume, 128],
    [teaspoon, usCustomary, volume, 0.16666666667],
    [tablespoon, usCustomary, volume, 0.5],
    [cup, usCustomary, volume, 8],
    [shot, usCustomary, volume, 1.5],
    [ounce, usCustomary, mass, 1],
    [pound, usCustomary, mass, 16],
    [calorie, usCustomary, energy, 4184],
    [joule, usCustomary, energy, 1],
    [kilojoule, usCustomary, mass, 1000],
    [fahrenheit, usCustomary, temperature, 1],
    [second, usCustomary, time, 1],
    [minute, usCustomary, time, 60],
    [hour, usCustomary, time, 3600],
    [day, usCustomary, time, 86400],
    [week, usCustomary, time, 604800],
    [month, usCustomary, time, 2629756.8],
    [year, usCustomary, time, 31556952],
    [pieces, usCustomary, amount, 1],
  ])(([{ id: unitId }, { id: unitSystemId }, { id: unitTypeId }, scale]) =>
    ({ unitId, unitSystemId, unitTypeId, scale })))
  
  await p.unitSystemConversion.createManyRet(map([
    [length, metric, britishImperial, 0.0254, 0],
    [length, britishImperial, metric, 39.3701, 0],
    [length, metric, usCustomary, 0.0254, 0],
    [length, usCustomary, metric, 39.3701, 0],
    [length, britishImperial, usCustomary, 1, 0],
    [length, usCustomary, britishImperial, 1, 0],
    [area, metric, britishImperial, 0.0006451612903, 0],
    [area, britishImperial, metric, 1550.0031, 0],
    [area, metric, usCustomary, 0.0006451612903, 0],
    [area, usCustomary, metric, 1550.0031, 0],
    [area, britishImperial, usCustomary, 1, 0],
    [area, usCustomary, britishImperial, 1, 0],
    [volume, metric, britishImperial, 0.0284130742, 0],
    [volume, britishImperial, metric, 35.195083, 0],
    [volume, metric, usCustomary, 33.8140227018, 0],
    [volume, usCustomary, metric, 0.0295735296, 0],
    [volume, britishImperial, usCustomary, 0.96076034, 0],
    [volume, usCustomary, britishImperial, 1.040843, 0],
    [mass, metric, britishImperial, 28.349523125, 0],
    [mass, britishImperial, metric, 0.03527396195, 0],
    [mass, metric, usCustomary, 28.349523125, 0],
    [mass, usCustomary, metric, 0.03527396195, 0],
    [mass, britishImperial, usCustomary, 1, 0],
    [mass, usCustomary, britishImperial, 1, 0],
    [energy, metric, britishImperial, 1, 0],
    [energy, britishImperial, metric, 1, 0],
    [energy, metric, usCustomary, 1, 0],
    [energy, usCustomary, metric, 1, 0],
    [energy, britishImperial, usCustomary, 1, 0],
    [energy, usCustomary, britishImperial, 1, 0],
    [temperature, metric, britishImperial, 1.8, 32],
    [temperature, britishImperial, metric, 0.55555555556, -17.7777777778],
    [temperature, metric, usCustomary, 1.8, 32],
    [temperature, usCustomary, metric, 0.55555555556, -17.7777777778],
    [temperature, britishImperial, usCustomary, 1, 0],
    [temperature, usCustomary, britishImperial, 1, 0],
    [time, metric, britishImperial, 1, 0],
    [time, britishImperial, metric, 1, 0],
    [time, metric, usCustomary, 1, 0],
    [time, usCustomary, metric, 1, 0],
    [time, britishImperial, usCustomary, 1, 0],
    [time, usCustomary, britishImperial, 1, 0],
    [amount, metric, britishImperial, 1, 0],
    [amount, britishImperial, metric, 1, 0],
    [amount, metric, usCustomary, 1, 0],
    [amount, usCustomary, metric, 1, 0],
    [amount, britishImperial, usCustomary, 1, 0],
    [amount, usCustomary, britishImperial, 1, 0],
  ])(([{ id: unitTypeId }, { id: sourceUnitSystemId }, { id: destinationUnitSystemId }, scale, offset]) =>
    ({ unitTypeId, sourceUnitSystemId, destinationUnitSystemId, scale, offset })))
}

main()
  .then(async () => {
    await p.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await p.$disconnect()
    process.exit(1)
  })
