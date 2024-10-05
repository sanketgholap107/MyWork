import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        // console.log(pathnames, breadcrumbPath);

        if (name == "LHBPressOnForm") {
          name = "LHB Press-On Form ";
        }
        if(name=="wheeldiscA_details"){
          name = "Wheel Disc A Side";
        }
        if(name=="wheeldiscABoresize_details"){
          name = "Wheel Disc A Side Bore Size";
        }
        if(name=="wheeldiscB_details"){
          name = "Wheel Disc B Side";
        }
        if(name=="wheeldiscBBoresize_details"){
          name = "Wheel Disc B Side Bore Size";
        }
        if(name=="brakediscA_details"){
          name = "Brake Disc A Side";
        }
        if(name=="brakediscABoresize_details"){
          name = "Brake Disc A Side Bore Size";
        }
        if(name=="brakediscB_details"){
          name = "Brake Disc B Side";
        }
        if(name=="brakediscBBoresize_details"){
          name = "Brake Disc B Side Bore Size";
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

export default Breadcrumbs;
