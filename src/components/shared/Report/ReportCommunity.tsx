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
    <Modal isOpen={reportModal} onClose={() => setReportModal(false)} mt={12}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Subforum</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="report"
            accessibilityLabel="report subforum"
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
