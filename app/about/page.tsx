import { Building2, Users, Trophy, Heart } from "lucide-react"

export default function AboutPage() {
  const stats = [
    {
      icon: Building2,
      label: "Founded",
      value: "2020",
    },
    {
      icon: Users,
      label: "Happy Customers",
      value: "10,000+",
    },
    {
      icon: Trophy,
      label: "Awards",
      value: "15+",
    },
    {
      icon: Heart,
      label: "5-Star Reviews",
      value: "2,500+",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">About BORAN</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about delivering quality products and exceptional shopping experiences to our customers worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <stat.icon className="h-8 w-8 text-primary mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            At BORAN, our mission is to provide high-quality products while maintaining exceptional customer service and sustainability practices. We believe in creating lasting relationships with our customers and contributing positively to our community.
          </p>

          <h3 className="text-2xl font-bold mb-4">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-2">Quality First</h4>
              <p className="text-gray-600">We never compromise on the quality of our products and services.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Customer Focus</h4>
              <p className="text-gray-600">Your satisfaction is our top priority in everything we do.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Sustainability</h4>
              <p className="text-gray-600">We're committed to environmentally responsible practices.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">Our Team</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Behind BORAN is a dedicated team of professionals working tirelessly to bring you the best shopping experience.
          </p>
        </div>
      </main>
    </div>
  )
}

