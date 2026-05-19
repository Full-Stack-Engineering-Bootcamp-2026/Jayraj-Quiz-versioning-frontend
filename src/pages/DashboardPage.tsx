import { useAppSelector } from "@/store/hooks";

const DashboardPage = () => {
  const auth = useAppSelector(
    (state) => state.auth
  );

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <pre className="mt-5">
        {JSON.stringify(auth, null, 2)}
      </pre>

    </div>
  );
};

export default DashboardPage;