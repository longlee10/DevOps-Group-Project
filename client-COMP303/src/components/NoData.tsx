const NoData = ({ data }: { data: string }) => {
  return <p className="text-2xl mt-3">There is no {data} available.</p>;
};

export default NoData;
