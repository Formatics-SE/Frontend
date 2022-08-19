 import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function Courses() {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="success">Course1</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="">Groups</Dropdown.Item>
        <Dropdown.Item href="">Take Attendance</Dropdown.Item>
        <Dropdown.Item href="">Create a Poll</Dropdown.Item>
        <Dropdown.Item href="">Allocate Marks</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default  Courses; 