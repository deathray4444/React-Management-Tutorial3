import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
}));

const CustomerAdd = (props) => {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
    setOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      props.stateReFresh();
    });

    setFile(null);
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setFileName("");
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };

  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };

  const handlebirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const classes = styles();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        고객추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객추가</DialogTitle>
        <DialogContent>
          <input
            className={classes.hidden}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br />
          <Textfield
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleUserChange}
          />
          <br />

          <Textfield
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handlebirthdayChange}
          />
          <br />

          <Textfield
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
          />
          <br />

          <Textfield
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleJobChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(CustomerAdd);
