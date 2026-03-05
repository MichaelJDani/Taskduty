import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-10 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-10 md:gap-15 py-10 md:py-20">
        
        <div className="flex flex-col gap-6 text-center md:text-left">
          
          <h1 className="text-4xl md:text-5xl font-bold text-dark-purple leading-tight md:w-120">
            Manage your Tasks on{" "}
            <span className="text-custom-hover">TaskDuty</span>
          </h1>

          <p className="text-light-grey leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            velit, nihil, exercitationem ad culpa maiores dicta temporibus alias
            corporis voluptas nemo explicabo veritatis porro soluta dolor illo
            repudiandae officiis quibusdam minima!
          </p>

          <button
            className="mt-4 w-full md:w-max bg-custom-hover hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-md transition cursor-pointer"
            onClick={() => navigate("/tasks")}
          >
            Go to My Tasks
          </button>
        </div>

        
        <div className="flex justify-center md:justify-end">
          <img
            src="/hero_image.png"
            alt="hero"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

      </div>
    </main>
  );
}