import AgencyTitle from "./AgencyTitle";

const AgencyOverview = ({ overview, setAgency }) => {
  return (
    <div>
      <AgencyTitle data={overview} setAgency={setAgency} isValue={!!overview}>
        Overview
      </AgencyTitle>
      {overview && (
        <article className="prose agency_overview">
          <style>
            {`
              .agency_overview * {
                margin: 0 !important;
                padding: 0 !important;
              }
            `}
          </style>
          <div dangerouslySetInnerHTML={{ __html: overview }} />
        </article>
      )}
    </div>
  );
};

export default AgencyOverview;
