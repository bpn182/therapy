import { IPathConfig } from "@/app/interfaces/index.interface";

export const insurancePathConfig: IPathConfig = {
  "/insurance": {
    mainText: "Insurance, ",
    highlightText: "Portal",
    subText: "Manange your insurance claims",
  },
  "/insurance/claim/list": {
    mainText: "Recent ",
    highlightText: "Claims",
  },
  "/insurance/claim/update": {
    mainText: "Update ",
    highlightText: "Claim",
  },
};
