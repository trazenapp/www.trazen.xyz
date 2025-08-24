import React from "react";
import Card from "@/components/card";
import FormHeading from "@/components/formHeading";
import ResetPasswordForm from "@/components/form/resetPasswordForm";
import FormSuccess from "@/components/form/formSuccess";

const ResetPassword = () => {
  return (
    <Card className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto border-0 md:border md:border-[#303030] py-10 bg-transparent md:bg-[#161616] flex flex-col items-center justify-center">
      <div className="mb-8">
        <FormHeading
          title="Enter New Password"
          subtitle="Kindly enter your new password"
        />
      </div>
      <ResetPasswordForm />
      {/* <FormSuccess
        title="Password changed"
        subtitle="Your password has been successfully changed. You can now long in with your new password"
        buttonText="Back to login"
        url="/sign-in"
      /> */}
    </Card>
  );
};

export default ResetPassword;
