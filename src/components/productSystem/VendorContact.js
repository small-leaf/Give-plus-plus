import React from 'react';
import styled from 'styled-components';
import useProduct from '../../hooks/productHooks/useProduct';
import { WrapperMask } from '../userSystem';
import { COLOR, FONT, DISTANCE } from '../../constants/style';
import { IconComponent } from '..';

const VendorContactContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  min-width: max-content;
  padding: ${DISTANCE.lg} ${DISTANCE.lg};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.bg_primary};
`;

const InnerContainer = styled.div``;

const Title = styled.h1`
  color: ${COLOR.black};
  font-size: ${FONT.lg};
  margin-bottom: ${DISTANCE.md};
`;

const Topic = styled.p`
  color: ${COLOR.text_1};
  font-size: ${FONT.md};
  margin: ${DISTANCE.xs} 0;
`;

const Content = styled.p`
  color: ${COLOR.black};
  font-size: ${FONT.sm};
`;

const QRCodeImg = styled.img`
  height: 150px;
  width: 150px;
`;

const GoBackButton = styled.div`
  position: absolute;
  transform: translate(210px, -60px);
`;

export const VendorContact = ({ setIsShowContact }) => {
  const { vendorInfo } = useProduct();

  return (
    <WrapperMask>
      <VendorContactContainer>
        <InnerContainer>
          <GoBackButton onClick={() => setIsShowContact(false)}>
            <IconComponent kind={'close-black'} />
          </GoBackButton>
          <Title>聯絡資訊</Title>
          <Topic>電子郵件</Topic>
          <Content>{vendorInfo.email}</Content>
          {vendorInfo.socialmedia_id && (
            <>
              <Topic>Line</Topic>
              <QRCodeImg src={vendorInfo.socialmedia_id} />
            </>
          )}
        </InnerContainer>
      </VendorContactContainer>
    </WrapperMask>
  );
};
