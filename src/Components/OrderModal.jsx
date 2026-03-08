const ProductSpecs = () => {
  const specs = [
    {
      value: "16.5 cm",
      label: "LENGTH",
    },
    {
      value: "15.8 cm",
      label: "WIDTH",
    },
    {
      value: "6.35 cm",
      label: "HEIGHT",
    },
    {
      value: "360°",
      label: "ROTATE",
    },
  ]

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {specs.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
              {item.value}
            </h3>
            <p className="text-gray-500 tracking-widest text-sm mt-2 font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductSpecs

