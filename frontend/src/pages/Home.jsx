import Layout from '../components/Layout/Layout';
import HomeCard from '../components/HomeCard';

function Home() {
  return (
    <Layout>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h3 className="text-3xl sm:text-2xl font-bold mb-12 text-dark-blue text-center">
            Home
          </h3>
        </div>
        <div className="flex flex-row justify-center">
          <HomeCard url="/books" icon="BookOpenIcon" title="Books"/>
          <HomeCard url="/staffs" icon="UsersIcon" title="Staffs"/>
          <HomeCard url="/stores" icon="BuildingStorefrontIcon" title="Stores"/>
          <HomeCard url="/inventories" icon="ArchiveBoxIcon" title="Inventory"/>
        </div>
      </div>
    </Layout>
  );
}

export default Home;