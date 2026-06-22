import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Toolbar, ToolbarButton } from "@mui/x-data-grid";
import PlusIcon from '../assets/plus.svg';
import DeleteIcon from '../assets/delete.svg';

function CustomToolbar() {
  function addCallback() {
    console.log('addCallback')
  }
  function deleteCallback() {
    console.log('deleteCallback')
  }
  return (
    <Toolbar>
      <Typography sx={{ fontWeight: 'medium', flex: 1, mx: 0.5 }}>
        Labels Toolbar
      </Typography>
      <Tooltip title="Add Label">
        <ToolbarButton render={<ToolbarButton />}>
          <img src={PlusIcon} alt="PlusIcon" width="20px" height="20px" onClick={addCallback} />
        </ToolbarButton>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 0.5 }} />
      <Tooltip title="Delete Label">
         <ToolbarButton render={<ToolbarButton />}>
          <img src={DeleteIcon} alt="DeleteIcon" width="20px" height="20px" onClick={deleteCallback} />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}
export default CustomToolbar;