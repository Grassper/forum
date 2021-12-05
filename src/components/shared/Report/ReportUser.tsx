import { Button, Modal, Radio } from "native-base";
import React from "react";

interface Props_ {
  userId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportUser: React.FC<Props_> = ({
  reportModal,
  setReportModal,
}) => {
  const [value, setValue] = React.useState("");

  return (
    <Modal isOpen={reportModal} onClose={() => setReportModal(false)} mt={12}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report User</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="report"
            accessibilityLabel="report user"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Radio
              value="Harassment and cyberbullying"
              my={1}
              colorScheme="warning"
            >
              Harassment and cyberbullying
            </Radio>
            <Radio value="Privacy" my={1} colorScheme="warning">
              Privacy
            </Radio>
            <Radio value="Impersonation" my={1} colorScheme="warning">
              Impersonation
            </Radio>
            <Radio value="Violent threats" my={1} colorScheme="warning">
              Violent threats
            </Radio>
            <Radio value="Child endangerment" my={1} colorScheme="warning">
              Child endangerment
            </Radio>
            <Radio
              value="Hate speech or graphic violence"
              my={1}
              colorScheme="warning"
            >
              Hate speech or graphic violence
            </Radio>
            <Radio value="Spam and scams" my={1} colorScheme="warning">
              Spam and scams
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setReportModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              bg="rose.600"
              variant="unstyled"
              onPress={() => {
                setReportModal(false);
              }}
            >
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
