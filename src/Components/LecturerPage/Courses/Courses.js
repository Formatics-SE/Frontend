import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



const Courses = ()=> {
  
  return (
    <>
    {['course1', 'course2' ].map(
      (variant) => (
        <DropdownButton
          as={ButtonGroup}
          key={variant}
          id={`dropdown-variants-${variant}`}
          variant={variant.toLowerCase()}
          title={variant}
        >
          <Dropdown.Item eventKey="1">Groups</Dropdown.Item>
          <Dropdown.Item eventKey="2">Take Attendance</Dropdown.Item>
          <Dropdown.Item eventKey="3">Create a Poll</Dropdown.Item>
          <Dropdown.Item eventKey="4">Allocate Marks</Dropdown.Item>
          
 
        </DropdownButton>
      ),
    )}
  </>
);
}


export default Courses;
