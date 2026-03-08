import pic1 from "../assets/pic1.jpeg"
import pic2 from "../assets/pic2.jpeg"

export default function Specs() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      {/* Headline */}
    <h2 className="text-1xl md:text-2xl font-bold text-center mb-16 leading-relaxed max-w-4xl mx-auto">
  <span className="text-gray-600">Feel the thrill with the </span>
  <span className="text-orange-500">Drift 4WD Stunt Car</span>
  <span className="text-gray-600"> Fast, Exciting, Powerful, Durable, Adventurous</span>
  <span className="text-gray-600"> and All-Terrain Fun!</span>
</h2>
      {/* First block: Left image, Right text */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20 max-w-6xl mx-auto">
        {/* Image - Left */}
        <div className="md:w-1/2">
          <img 
            src={pic1} 
            alt="Drift Car Feature 1" 
            className="w-full rounded-xl shadow-xl"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>

        {/* Text - Right */}
        <div className="md:w-1/2">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            Ultimate Off-Road Performance
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
           Our Drift 4WD Stunt Car handles sand, gravel, and mud with smooth control, rapid acceleration, and thrilling performance. Equipped with remote control and bright LED lights for night-time fun, it’s durable enough for jumps and crashes, indoors or outdoors. Experience unmatched speed, power, and precision in every ride.
          </p>
        </div>
      </div>

      {/* Second block: Right image, Left text */}
      <div className="flex flex-col md:flex-row items-center gap-14 max-w-6xl mx-auto">
        {/* Text - Left */}
        <div className="md:w-1/2 order-2 md:order-1">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 border-l-4 border-orange-500 pl-4">
            Durable & High Quality
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed text-justify">
           Built with premium, durable materials, this climbing stunt car handles tough stunts, jumps, and rugged terrain. Its lightweight design makes it perfect for kids and adults. With a rechargeable battery and precise remote control, it climbs, drifts, and moves smoothly on roads, lawns, sand, and stone surfaces, delivering hours of thrilling indoor and outdoor fun.
          </p>
        </div>

        {/* Image - Right */}
        <div className="md:w-1/2 order-1 md:order-2">
          <img 
            src={pic2} 
            alt="Drift Car Feature 2" 
            className="w-full rounded-xl shadow-xl"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  )
}

