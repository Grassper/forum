import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  communityId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportCommunity: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  communityId,
}) => {
  const [value, setValue] = React.useState("");
  const currentUser = React.useContext(UserContext).user;

  const SubmitHandler = () => {
    if (currentUser.id && communityId && value) {
      const input: reportCommunityFetch_ = {
        content: value,
        reporterId: currentUser.id,
        communityId: communityId,
      };
      reportCommunityFetch(input);
    }

    setReportModal(false);
  };

  return (
    <Modal isOpen={reportModal} mt={12} onClose={() => setReportModal(false)}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Subforum</Modal.Header>
        <Modal.Body>
          <Radio.Group
            accessibilityLabel="report subforum"
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

interface reportCommunityFetch_ {
  content: string;
  reporterId: string;
  communityId: string;
}
const reportCommunityFetch = async (input: reportCommunityFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportCommunityRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportCommunityRelation_>;

    if (reportUserData.data?.createReportCommunity) {
      return reportUserData.data.createReportCommunity.id;
    }
  } catch (err) {
    console.error(
      "Error occured while report by user in the community report screen",
      err
    );
  }
};

interface CreateReportCommunityRelation_ {
  createReportCommunity?: { id: string };
}

const CreateReportCommunityRelation = /* GraphQL */ `
  mutation CreateReportCommunity($input: CreateReportCommunityInput!) {
    createReportCommunity(input: $input) {
      id
    }
  }
`;
