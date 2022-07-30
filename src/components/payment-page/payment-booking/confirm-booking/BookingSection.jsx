import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";
import { CustomerContext } from "../../../../providers/CustomerContext";
import { fetchBookingAction } from "../../../../stores/slices/bookingHome.slice";
import { Collapse, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";

const { Panel } = Collapse;

function BookingSection() {
  const bookingState = useSelector((state) => state?.booking?.bookingState);

  const { orderInfo } = useContext(CustomerContext);

  const [ellipsisIntroduction, setEllipsisIntroduction] = useState(false);

  const dispatch = useDispatch();
  let isLoading = bookingState?.loading;

  let bookingLast = bookingState?.data.length;
  let bookingNumber = bookingState?.data[bookingLast - 1].id;

  let bookingName =
    orderInfo.userInfo.firstName + " " + orderInfo.userInfo.lastName;
  let bookingEmail = orderInfo.userInfo.email;
  let payMethod = orderInfo.payment.method;

  const handleComeHomePage = () => {
    dispatch(fetchBookingAction());
  };

  return (
    <div className="pay-form-contact booking-success">
      <div className="booking-success">
        <h2 style={{ paddingLeft: 0, color: "#004862" }}>Booking success</h2>

        <div>
          <h6 style={{ paddingLeft: "25px", color: "#004862" }}>
            <b>
              Hi <span style={{ color: "#007fae" }}>{bookingName}</span>!
            </b>
          </h6>
          <h6>
            <CheckOutlined />
            Your booking at{" "}
            <span style={{ color: "#007fae" }}>Ocean Villa</span> has been
            confirmed.
          </h6>

          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            {payMethod === "Cash" ? (
              <span>
                You have chosen to pay directly at the hotel,{" "}
                <span style={{ color: "#007fae" }}>Ocean Villa</span> will not
                charge your credit card.
              </span>
            ) : (
              <span>
                You have chosen to pay by credit card.{" "}
                <span style={{ color: "#007fae" }}>Ocean Villa</span> will
                charge your credit card.
              </span>
            )}
          </h6>
          <h6>
            <CheckOutlined />
            &nbsp; Booking Number:{" "}
            {!isLoading && <b style={{ color: "blue" }}>{bookingNumber}</b>}
          </h6>

          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            <span>
              Your booking confirmation will be email to: &nbsp;
              <b style={{ color: "green" }}>{bookingEmail}</b>
            </span>
          </h6>
          <h6 style={{ display: "flex" }}>
            <CheckOutlined />

            <span>
              Please present booking number or this confirmation when check-in
            </span>
          </h6>
        </div>
        <Collapse
          defaultActiveKey={["1"]}
          bordered={false}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="end"
          className="pay-method"
        >
          <Panel header="Cancellation policy" key="1">
            <div
              className={ellipsisIntroduction ? "" : "ellipsis-text"}
              onClick={() => {
                setEllipsisIntroduction(!ellipsisIntroduction);
              }}
            >
              <p>
                Room rate book on standard rate: Any cancellation received
                within 7 days prior to arrival date will incur the full period
                charge. Failure to arrive at your hotel or property will be
                treated as a No-Show and no refund will be given
              </p>
              <p>
                Room rate book under promotion: Any cancellation received within
                14 days prior to arrival date will incur the full period charge.
                Failure to arrive at your hotel or property will be treated as a
                No-Show and no refund will be given
              </p>
              <p>
                No-showed booking will be full charged for whole booking for
                full length stay
              </p>
            </div>
            <div
              style={{
                marginTop: "10px",
                cursor: "pointer",
                color: "#005e84",
              }}
              onClick={() => {
                setEllipsisIntroduction(!ellipsisIntroduction);
              }}
            >
              {ellipsisIntroduction ? "Read less" : "Read more"}
            </div>
          </Panel>
        </Collapse>
        <Row justify="space-around" className="btn-booking-section">
          <Col xs={24} sm={12} md={12} lg={12}>
            <NavLink to="/bookinghistory">
              <button onClick={handleComeHomePage} className="pay-btn-logout">
                View My Bookings
              </button>
            </NavLink>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Link to="/">
              <button onClick={handleComeHomePage} className="pay-btn-logout">
                OK! Come Home Page
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookingSection;
