import { Link } from "react-router-dom";

export default function ResourceCard(props) {

  return (
    <div className="border border-neutral-300 overflow-hidden rounded-xl w-1/4 md:w-1/3">
      <Link
        to={
          props.resourceLink
        }
        target="_blank"
        className=""
      >
        <div>
          <img
            src={props.imgUrl}
            alt=""
            className="object-cover w-80 h-56"
          />
        </div>
        <div className="font-semibold px-5 py-8">
          {props.title}
        </div>
      </Link>
    </div>
  );
}
