import Hero from "../components/Hero";
import HomeMenu from "../components/HomeMenu";
import SectionHeaders from "../components/SectionHeaders";

export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders mainHeader={"About us"} subHeader={"Our story"} />
        <div className="text-gray-500 max-w-xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam atque
            illum eaque doloremque vero recusandae, tempore, odit pariatur
            dignissimos inventore quas maxime cupiditate, perspiciatis tenetur
            soluta sequi itaque dolorum repellat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            dolorum quae modi repellat inventore, atque beatae nesciunt dolor,
            sequi expedita, dolores vel labore odit consequuntur suscipit. Error
            unde numquam dignissimos!
          </p>
        </div>
      </section>
      <section className="text-center" id="contact">
        <SectionHeaders mainHeader={'Contact us'} subHeader={'Don\'t hasitate'}/>
        <div className="mt-8">

        <a href="tel:+380508098182" className="text-4xl underline text-gray-500">+38 050 809 8182</a>
        </div>
      </section>
      
    </>
  );
}
