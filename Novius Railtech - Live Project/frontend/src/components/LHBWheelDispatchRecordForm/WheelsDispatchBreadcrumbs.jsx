import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const WheelsDispatchBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/dashboard">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        // console.log(pathnames, breadcrumbPath);

        if (name == "wheelsdispatchrecordform") {
          name = "wheels dispatch record form";
        }
        if (name == "divisionorcarshed_details") {
          name = "Division/Carshed Details";
        }

        function formatName(name) {
            return name
              .split('_')                        // Split the string by underscores
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
              .join(' ');                        // Join the words with a space
        }

        if(name.includes("_")){
            name = formatName(name);
        }

        return isLast ? (
          <span key={breadcrumbPath}>
            {" "}
            <MdKeyboardArrowRight /> {name}
          </span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            <MdKeyboardArrowRight /> <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default WheelsDispatchBreadcrumbs;
