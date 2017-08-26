import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const form ={
  backgroundColor:'white',
  paddingTop: '10px',
  paddingBottom:'10px'
}
const bottomText={
  width:'100%'
}
const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
    <div className="background">

        
        <Card className="container" style={{ paddingTop: '10px' }}>
          
        <form className="center-align" style={form} action="/" onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}
        <h5>馬上加入騎士團的行列吧！</h5>
        <div>
          <TextField
            floatingLabelText="名字"
            name="name"
            errorText={errors.name}
            onChange={onChange}
            value={user.name}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="信箱"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div>
          <TextField
            floatingLabelText="密碼"
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>

        <div className="center-align">
          <RaisedButton type="submit" label="註冊" primary />
        </div>
        <p style={bottomText} className="center-align">已經有帳號了？ <Link to={'/login'}>登入</Link></p>
      </form>
      </Card>
  </div>
  );

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

