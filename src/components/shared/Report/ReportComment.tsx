import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  commentId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportComment: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  commentId,
}) => {
  const [value, setValue] = React.useState("");
  const currentUser = React.useContext(UserContext).user;

  const SubmitHandler = () => {
    if (currentUser.id && commentId && value) {
      const input: reportCommentFetch_ = {
        content: value,
        reporterId: currentUser.id,
        commentId: commentId,
      };
      reportCommentFetch(input);
    }

    setReportModal(false);
  };

  return (
    <Modal isOpen={reportModal} onClose={() => setReportModal(false)} mt={12}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Comment</Modal.Header>
        <Modal.Body>
          <Radio.Group
            name="report"
            accessibilityLabel="report comment"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <Radio
              value="Unwanted commercial content"
              my={1}
              colorScheme="warning"
            >
              Unwanted commercial content
            </Radio>
            <Radio value=" spam" my={1} colorScheme="warning">
              Spam
            </Radio>
            <Radio value="Pornography" my={1} colorScheme="warning">
              Pornography
            </Radio>
            <Radio
              value="sexually explicit material"
              my={1}
              colorScheme="warning"
            >
              sexually explicit material
            </Radio>
            <Radio value="Child abuse" my={1} colorScheme="warning">
              Child abuse
            </Radio>
            <Radio
              value="Hate speech or graphic violence"
              my={1}
              colorScheme="warning"
            >
              Hate speech or graphic violence
            </Radio>
            <Radio value="Harassment or bullying" my={1} colorScheme="warning">
              Harassment or bullying
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

interface reportCommentFetch_ {
  content: string;
  reporterId: string;
  commentId: string;
}
const reportCommentFetch = async (input: reportCommentFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportCommentRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportCommentRelation_>;

    if (reportUserData.data?.createReportComment) {
      return reportUserData.data.createReportComment.id;
    }
  } catch (err) {
    console.error(
      "Error occured while report by user in the comment report screen",
      err
    );
  }
};

interface CreateReportCommentRelation_ {
  createReportComment?: { id: string };
}

const CreateReportCommentRelation = /* GraphQL */ `
  mutation CreateReportComment($input: CreateReportCommentInput!) {
    createReportComment(input: $input) {
      id
    }
  }
`;
