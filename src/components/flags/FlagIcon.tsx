import FlagIconEn from "./FlagIconEn";
import FlagIconGe from "./FlagIconGe";
import FlagIconRu from "./FlagIconRu";
import FlagIconTm from "./FlagIconTm";
import FlagIconTr from "./FlagIconTr";
import FlagIconUz from "./FlagIconUz";
interface Props {
  code: string;
}
export default function FlagIcon({ code }: Props) {
  switch (code) {
    case "tr":
      return <FlagIconTr />;
    case "en":
      return <FlagIconEn />;
    case "ru":
      return <FlagIconRu />;
    case "uz":
      return <FlagIconUz />;
    case "tm":
      return <FlagIconTm />;
    case "ge":
      return <FlagIconGe />;
    default:
      return <></>;
  }
}
