import React, { useState } from 'react';
import Input from "@/app/components/normal_input";
import ButtonN from "@/app/components/normal_button";


function SMSCODE() {

    return (
        <div className="container mx-auto">
            {/* SMS Confirmation Section */}
            <div>
                <p className="py-4 w-full text-center">
                    Na podany numer telefonu wysłaliśmy kod w celu potwierdzenia wizyty.<br/>Wpisz poniżej i
                    potwierdź.</p>

                <Input type="smscode" text="Kod SMS:" placeholder="Powierdź 5-cyfrowym kodem sms"/>
            </div>

            <ButtonN type="submit" value="Umów wizytę"></ButtonN>
        </div>
    );
}

export default SMSCODE;
