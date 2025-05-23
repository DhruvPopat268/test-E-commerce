import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your products and inventory</p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
