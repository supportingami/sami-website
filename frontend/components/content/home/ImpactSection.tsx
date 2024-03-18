import type { ComponentHomeImpactSection } from "../../../graphql/generated";

export const ImpactSectionComponent: React.FC<ComponentHomeImpactSection> = ({ Statement, ImpactNumbers }) => (
  <>
    <div className="flex flex-col align-center">
      <h3 className="text-white text-xl text-center">{Statement}</h3>
      <div className="grid grid-cols-2 2xl:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 justify-between align-center text-center py-6">
        {ImpactNumbers &&
          ImpactNumbers.map((ImpactNumber) => (
            <div key={ImpactNumber.id} className="flex flex-col flex-2">
              <div className="text-6xl font-medium">{ImpactNumber.Number}</div>
              <div className="uppercase text-black text-xs">{ImpactNumber.Title}</div>
            </div>
          ))}
      </div>
    </div>
  </>
);
