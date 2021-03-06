import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import ReactionButton from '@components/comment/ReactionButton';
import ReactMarkdown from 'react-markdown';
import Emoji from '@components/common/Emoji';
import { UserContext } from '@store/UserProvider';
import EditCommentForm from '@components/comment/NewCommentForm';

const Comment = ({
  comment: { id, isMain, content, updatedAt, reactions, user },
  onAddReaction,
  onDeleteReaction,
  isCommentEdit,
  setIsCommentEdit,
  onClickEditBtn,
}) => {
  const [auth] = useContext(UserContext);
  const getAddReactionHandler = () => (type) => onAddReaction({ commentId: id, type });
  const onClickEdit = () => (editContent) => onClickEditBtn(id, editContent);
  if (id === isCommentEdit) {
    return (
      <EditCommentForm
        onClickLeftBtn={setIsCommentEdit}
        onClickRightBtn={onClickEdit()}
        initValue={content}
        leftBtnText='cancel'
        rightBtnText='update comment'
        isEdit
      />
    );
  }
  return (
    <CommentWrapper className={isMain ? 'main-comment' : ''}>
      <Head>
        <Title>
          <NickName>{user.nickName}</NickName> commented <Moment fromNow>{updatedAt}</Moment>
        </Title>
        <Buttons>
          <ReactionButton onClickReaction={getAddReactionHandler()} />
          <EditButton type='button' onClick={() => setIsCommentEdit(id)}>
            Edit
          </EditButton>
        </Buttons>
      </Head>
      <Body>
        <Markdown>
          <ReactMarkdown className='markdown-body'>{content}</ReactMarkdown>
        </Markdown>
        {reactions && (
          <ReactionButtonWrapper>
            {reactions.map((reaction) => {
              const removable = auth.id === reaction.userId;
              return removable ? (
                <RemovableEmojiButton
                  type='button'
                  key={reaction.id}
                  onClick={() => onDeleteReaction({ commentId: id, reactionId: reaction.id })}
                >
                  <Emoji hexCode={reaction.type} />
                </RemovableEmojiButton>
              ) : (
                <EmojiButton type='button' key={reaction.id}>
                  <Emoji hexCode={reaction.type} />
                </EmojiButton>
              );
            })}
          </ReactionButtonWrapper>
        )}
      </Body>
    </CommentWrapper>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onAddReaction: PropTypes.func.isRequired,
  onDeleteReaction: PropTypes.func.isRequired,
  isCommentEdit: PropTypes.number.isRequired,
  setIsCommentEdit: PropTypes.func.isRequired,
  onClickEditBtn: PropTypes.func.isRequired,
};

const CommentWrapper = styled.article`
  position: relative;
  color: ${({ theme }) => theme.color.textColor};
  background-color: ${({ theme }) => theme.color.whiteColor};
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:before {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    border-width: 8px;
    border-right-color: ${({ theme }) => theme.color.borderColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
  &:after {
    width: 0;
    height: 0;
    pointer-events: none;
    content: ' ';
    border-color: transparent;
    border-style: solid solid outset;
    display: block;
    margin-top: 1px;
    margin-left: 2px;
    border-width: 7px;
    border-right-color: ${({ theme }) => theme.color.shadeBgColor};
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
  }
  &.main-comment:after {
    border-right-color: ${({ theme }) => theme.color.mainCommentHeadColor};
  }
`;

const Head = styled.div`
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px 6px 0 0;

  ${CommentWrapper}.main-comment & {
    background-color: ${({ theme }) => theme.color.mainCommentHeadColor};
  }
`;

const Title = styled.div`
  padding: 10px 0;
  color: ${({ theme }) => theme.color.secondaryTextColor};
`;

const NickName = styled.span`
  color: ${({ theme }) => theme.color.textColor};
  font-weight: 600;
`;

const Buttons = styled.div``;

const EditButton = styled.button`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  border-radius: 6px;
`;

const Body = styled.div`
  border-radius: 0 0 6px 6px;
  overflow: hidden;
`;

const Markdown = styled.div`
  padding: 15px;
`;

const ReactionButtonWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.borderColor};
`;

const EmojiButton = styled.button`
  padding: 8px 12px;
  border-right: 1px solid ${({ theme }) => theme.color.borderColor};
  cursor: auto;
`;

const RemovableEmojiButton = styled(EmojiButton)`
  background-color: ${({ theme }) => theme.color.lightBlueColor};
  cursor: pointer;
`;

export default Comment;
