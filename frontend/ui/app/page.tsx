import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <div key="1" className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sm:p-6 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Button>
          <nav className="hidden space-x-4 text-sm font-medium lg:flex">
            <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Home
            </Link>
            <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Features
            </Link>
            <Link className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="hidden space-x-4 text-sm lg:flex">
          <Link className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:underline" href="#">
            Sign In
          </Link>
          <Link className="text-gray-500 hover:underline dark:text-gray-400 dark:hover:underline" href="#">
            Sign Up
          </Link>
          <Button className="lg:hidden" size="icon" variant="outline">
            <ChevronDownIcon className="w-4 h-4 rotate-90" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="container flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter lg:text-6xl xl:text-7xl/relaxed">
              Interview like a pro.
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              The platform for rapid progress. Let your team focus on shipping features instead of managing
              infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
            </p>
          </div>
        </div>
      </main>
      <footer className="grid gap-4 p-4 border-t border-gray-200 items-center justify-center sm:p-6 md:grid-cols-2 lg:grid-cols-4 dark:border-gray-800">
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            Terms and Conditions
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">Read our terms and conditions</p>
        </div>
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            FAQ
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">Have any questions? Find answers here</p>
        </div>
        <div className="space-y-2">
          <Link className="font-bold text-gray-900 dark:text-gray-50" href="#">
            Privacy Policy
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">Review our privacy policy</p>
        </div>
        <div className="flex justify-center space-x-4 lg:justify-end lg:space-x-0">
          <Button size="sm" variant="outline">
            Light
          </Button>
          <Button size="sm" variant="outline">
            Dark
          </Button>
        </div>
      </footer>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}
