import MaterialIcon, {colorPallet} from 'material-icons-react'

export const recommendYes = () => (
  <MaterialIcon
    className='restaurant-list-item-recommend'
    icon='check_circle'
    color={colorPallet.green._500}
  />
);
