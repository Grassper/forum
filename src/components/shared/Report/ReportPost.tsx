import { Button, Modal, Radio } from "native-base";
import React from "react";

interface Props_ {
  postId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportPost: React.FC<Props_> = ({
  reportModal,
  setReportModal,
}) => {
  const [value, setValue] = React.useState("Sexual content");

  return (
    <Modal isOpen={reportModal} onClose={() => setReportModal(false)} mt={12}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Post</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Radio value="Sexual content" my={1} colorScheme="warning">
              Sexual content
            </Radio>
            <Radio
              value="Violent or repulsive content"
              my={1}
              colorScheme="warning"
            >
              Violent or repulsive content
            </Radio>
            <Radio
              value="Hateful or abusive content"
              my={1}
              colorScheme="warning"
            >
              Hateful or abusive content
            </Radio>
            <Radio value="Harassment or bullying" my={1} colorScheme="warning">
              Harassment or bullying
            </Radio>
            <Radio
              value="Harmful or dangerous acts"
              my={1}
              colorScheme="warning"
            >
              Harmful or dangerous acts
            </Radio>
            <Radio value="Child abuse" my={1} colorScheme="warning">
              Child abuse
            </Radio>
            <Radio value="Promotes terrorism" my={1} colorScheme="warning">
              Promotes terrorism
            </Radio>
            <Radio value="Spam or misleading" my={1} colorScheme="warning">
              Spam or misleading
            </Radio>
            <Radio value="Infringes my rights" my={1} colorScheme="warning">
              Infringes my rights
            </Radio>
            <Radio value="Captions issue" my={1} colorScheme="warning">
              Captions issue
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
