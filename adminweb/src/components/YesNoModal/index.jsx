import { View } from "../View";
import { Button, Typography } from "@material-ui/core";
const YesNoModal = ({ modalData }) => {
  const {
    title,
    message,
    okText,
    cancelText,
    onOk = () => {},
    onCancel = () => {},
  } = modalData;

  return (
    <View className={`ctn-modal__content`}>
      {title && (
        <Typography className="mb-4 ctn-modal__content__title" size={20}>
          {title}
        </Typography>
      )}
      {message && (
        <Typography className="mb-5 ctn-modal__content__message">
          {message}
        </Typography>
      )}
      <View isRow justify="flex-end">
        <Button
          onClick={onCancel}
          type="button"
          variant="secondary-outline"
          className="mr-3"
        >
          {cancelText || "Cancel"}
        </Button>
        <Button onClick={onOk}>{okText || "OK"}</Button>
      </View>
    </View>
  );
};

export default YesNoModal;
