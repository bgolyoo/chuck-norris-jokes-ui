import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const inter = Inter({ subsets: ["latin"] });

type Joke = {
  icon_url: string;
  id: string;
  url: string;
  value: string;
};

export default function Home({ joke: initialJoke }: { joke: Joke }) {
  const router = useRouter();

  const [joke, setJoke] = useState<Joke>(initialJoke);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | false>(false);

  async function onRandomClick() {
    try {
      setIsLoading(true);
      const joke = await getJoke();
      setJoke(joke);
      setIsLoading(false);
    } catch (error: unknown) {
      setError(error as Error);
    }
  }

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <main className={inter.className + " bg-gradient-to-br from-cyan-50 to-white"}>
        <div className="flex text-neutral-800">
          <div className="p-12 flex-1 flex flex-col gap-y-4 justify-center">
            {!error ? (
              <>
                <div className="self-start text-3xl font-medium">{joke.value}</div>
                <div>
                  <button
                    type="button"
                    disabled={isLoading}
                    className="pl-2 select-none cursor-pointer bg-transparent outline-none text-left border-l-2 border-l-neutral-800 transition-all ease-in-out hover:border-l-4"
                    onClick={() => onRandomClick()}
                  >
                    {!isLoading ? "Hit me with another joke" : "Loading..."}
                  </button>
                </div>
              </>
            ) : (
              <p className="self-start text-3xl font-medium">`An error has occurred ${error.message}`</p>
            )}
          </div>
          <img
            src={`${router.basePath}/images/chuck.png`}
            alt="chuck"
            className="h-screen self-end pt-28 select-none"
          />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const joke = await getJoke();
  return { props: { joke } };
}

const getJoke = () => {
  return fetch("https://api.chucknorris.io/jokes/random").then((res) => res.json() as Promise<Joke>);
};
