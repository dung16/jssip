import { useEffect, useState } from 'react';
import FromLogin from './Component/FromLogin';
import Phone from './Component/Phone';

const setting_default = {
  name: 'test',
  socket:
  {
    uri: 'wss://sbc03.tel4vn.com:7444',
    'via_transport': 'auto'
  },
  uri: '106@2-test1.gcalls.vn:50061',
  password: 'test1106',
  'registrar_server': null,
  'contact_uri': null,
  'authorization_user': null,
  'instance_id': null,
  'session_timers': false,
  'use_preloaded_route': false,
  pcConfig:
  {
    rtcpMuxPolicy: 'negotiate',
    iceServers:
      [
        { urls: [ 'stun:stun.l.google.com:19302' ] }
      ]
  },
  callstats:
  {
    enabled: false,
    AppID: null,
    AppSecret: null
  },

}
function App() {
  const [ setting, setSetting ] = useState(setting_default)
  const [ step, setStep ] = useState(null);
  useEffect(() => {
    setSetting(setting_default)

  }, [])
  useEffect(() => {
    if (setting.name === '') {
      setStep(false)
    } else {
      setStep(true)
    }
  }, [ setting.name ])
  const handleSetting = (value) => {
    setSetting(value);
  }



  return (
    <div className="wrapper centered ">

      {step ?
        <Phone
          settings={ setting }

        /> :
        <FromLogin setting={ setting } handleSetting={ handleSetting } /> }
    </div>
  );
}

export default App;
