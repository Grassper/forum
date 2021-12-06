import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  userId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportUser: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  userId,
}) => {
  const [value, setValue] = React.useState("");
  const currentUser = React.useContext(UserContext).user;

  const SubmitHandler = () => {
    if (currentUser.id && userId && value) {
      const input: reportUserFetch_ = {
        content: value,
        reporterId: currentUser.id,
        userId: userId,
      };
      reportUserFetch(input);
    }

    setReportModal(false);
  };

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
            <Button bg="rose.600" variant="unstyled" onPress={SubmitHandler}>
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
interface reportUserFetch_ {
  content: string;
  reporterId: string;
  userId: string;
}
const reportUserFetch = async (input: reportUserFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportUserRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportUserRelation_>;

    if (reportUserData.data?.createReportUser) {
      return reportUserData.data.createReportUser.id;
    }
  } catch (err) {
    console.error("Error occured while report by user in report screen", err);
  }
};

interface CreateReportUserRelation_ {
  createReportUser?: { id: string };
}

const CreateReportUserRelation = /* GraphQL */ `
  mutation CreateReportUser($input: CreateReportUserInput!) {
    createReportUser(input: $input) {
      id
    }
  }
`;
