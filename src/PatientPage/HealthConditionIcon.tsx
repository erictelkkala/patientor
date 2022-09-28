import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthConditionIcon = (condition: number): JSX.Element => {
    switch (condition) {
        case 0:
            return (
                <FavoriteIcon fontSize={"large"} sx={{ color: 'green' }}></FavoriteIcon>
            );
        case 1:
            return (
                <FavoriteIcon fontSize={"large"} sx={{ color: 'orange' }}></FavoriteIcon>
            );
        case 2:
            return (
                <FavoriteIcon fontSize={"large"} sx={{ color: 'red' }}></FavoriteIcon>
            );
        case 3:
            return (
                <FavoriteIcon fontSize={"large"} sx={{ color: 'black' }}></FavoriteIcon>
            );
        default:
            return (
                <FavoriteIcon fontSize={"large"} sx={{ color: 'black' }}></FavoriteIcon>
            );
    }
};

export default HealthConditionIcon;