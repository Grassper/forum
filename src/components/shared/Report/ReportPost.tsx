import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  postId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportPost: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  postId,
}) => {
  const [value, setValue] = React.useState("");

  const currentUser = React.useContext(UserContext).user;

  const HandlerPostSubmit = () => {
    if (currentUser.id && postId && value) {
      const input: reportPostFetch_ = {
        content: value,
        reporterId: currentUser.id,
        postId: postId,
      };
      reportPostFetch(input);
    }

    setReportModal(false);
  };
  return (
    <Modal isOpen={reportModal} onClose={() => setReportModal(false)} mt={12}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Post</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="report"
            accessibilityLabel="report post"
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
              onPress={HandlerPostSubmit}
            >
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

interface reportPostFetch_ {
  content: string;
  reporterId: string;
  postId: string;
}
const reportPostFetch = async (input: reportPostFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportPostRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportUserRelation_>;

    if (reportUserData.data?.createReportPost) {
      return reportUserData.data.createReportPost.id;
    }
  } catch (err) {
    console.error(
      "Error occured while report by user in the post report screen",
      err
    );
  }
};

interface CreateReportUserRelation_ {
  createReportPost?: { id: string };
}

const CreateReportPostRelation = /* GraphQL */ `
  mutation CreateReportPost($input: CreateReportPostInput!) {
    createReportPost(input: $input) {
      id
    }
  }
`;
