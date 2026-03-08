const ProductSpecs = () => {
  const specs = [
    { value: "16.5", unit: "cm", label: "LENGTH" },
    { value: "15.8", unit: "cm", label: "WIDTH" },
    { value: "6.35", unit: "cm", label: "HEIGHT" },
    { value: "360°", unit: "", label: "ROTATE" },
  ]

  return (
    <section className="w-full py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
        {specs.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-md flex flex-col items-center justify-center min-h-28">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
              {item.value}
              {item.unit && (
                <span className="block text-2xl md:text-4xl">{item.unit}</span>
              )}
            </h3>
            <p className="text-gray-500 tracking-widest text-xs md:text-sm mt-2 font-medium uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductSpecs