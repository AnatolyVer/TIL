import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

export default function Home() {

    const month = [11, 0]


  return (
    <section className="container h-[calc(100vh-72px)] mx-auto flex flex-col lg:flex-row items-center justify-center xl:justify-between py-4 px-6">
      <div className="flex flex-col justify-center items-center lg:w-3/4 text-center mt-10 lg:mt-0">
        <h1 className="text-l sm:text-2xl lg:text-3xl leading-relaxed font-bold italic">
          Моя любовь к тебе не знает границ. Её невозможно удержать, она
          проникает в каждую клеточку моего существа, наполняя меня теплом и светом.
          Ты - моя муза, мой вдохновитель, и эта книга стала плодом моей любви к тебе.
          Каждое мгновение с тобой - это бесценный дар, который я берегу в своём сердце.
          Я люблю тебя бесконечно...
        </h1>
        <Link href="/film">
          <button className="mt-6 w-48 px-4 py-2 cursor-pointer text-white rounded bg-pink-500 hover:bg-pink-600 transition-colors">
            Смотреть фильм
          </button>
        </Link>
      </div>
      <div className="mt-6 xl:mt-0 w-1/3 xl:w-1/2 justify-center xl:justify-end xl:flex">
          {
              !month.includes(dayjs().get("month")) ? (
                  <Image
                      src="/sakura.png"
                      alt="corner"
                      width={396}
                      height={396}
                      className="rounded-lg object-cover"
                      priority
                  />
              ) : (
                  <Link href="/miracle">
                      <Image
                          src="/xmas.png"
                          alt="corner"
                          width={396}
                          height={396}
                          className="rounded-lg object-cover cursor-pointer"
                          priority
                      />
                  </Link>
              )
          }
      </div>
    </section>
  );
}

