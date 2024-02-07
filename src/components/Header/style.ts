import styled from 'styled-components';

export const Container = styled.div`
  background-color: #28478E;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: relative;
`;

export const TextContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: 600;
  color: #fff;
`;