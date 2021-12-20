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
    <Modal isOpen={reportModal} mt={12} onClose={() => setReportModal(false)}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report User</Modal.Header>
        <Modal.Body>
          <Radio.Group
            accessibilityLabel="report user"
            name="report"
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
            value={value}
          >
            <Radio
              colorScheme="warning"
              my={1}
              value="Harassment and cyberbullying"
            >
              Harassment and cyberbullying
            </Radio>
            <Radio colorScheme="warning" my={1} value="Privacy">
              Privacy
            </Radio>
            <Radio colorScheme="warning" my={1} value="Impersonation">
              Impersonation
            </Radio>
            <Radio colorScheme="warning" my={1} value="Violent threats">
              Violent threats
            </Radio>
            <Radio colorScheme="warning" my={1} value="Child endangerment">
              Child endangerment
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="Hate speech or graphic violence"
            >
              Hate speech or graphic violence
            </Radio>
            <Radio colorScheme="warning" my={1} value="Spam and scams">
              Spam and scams
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              colorScheme="blueGray"
              onPress={() => {
                setReportModal(false);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button bg="rose.600" onPress={SubmitHandler} variant="unstyled">
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
