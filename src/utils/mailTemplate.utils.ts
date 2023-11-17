export const emailReminder = ( agentName:string, consumerCount:number, consumerList:string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]><xml>
   <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
   </o:OfficeDocumentSettings>
  </xml><![endif]-->
  <!-- fix outlook zooming on 120 DPI windows devices -->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
  <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS 7-9 -->
  <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS 7-9 -->
  <title>Single Column</title>

  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-spacing: 0;
    }

    table td {
      border-collapse: collapse;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height: 100%;
    }

    .ReadMsgBody {
      width: 100%;
      background-color: #ebebeb;
    }

    table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    .yshortcuts a {
      border-bottom: none !important;
    }

    @media screen and (max-width: 599px) {

      .force-row,
      .container {
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    @media screen and (max-width: 400px) {
      .container-padding {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
    }

    .ios-footer a {
      color: #aaaaaa !important;
      text-decoration: underline;
    }

    a[href^="x-apple-data-detectors:"],
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
  </style>
</head>

<body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

  <!-- 100% background wrapper (grey background) -->
  <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">
    <tr>
      <td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">

        <br>

        <!-- 600px container (white background) -->
        <table border="0" width="600" cellpadding="0" cellspacing="0" class="container"
          style="width:600px;max-width:600px">
          <tr>
            <td class="container-padding header" align="left"
              style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;padding-bottom:12px;color:#DF4726;padding-left:24px;padding-right:24px">
              <img src="https://pinkan.id/static/media/logo-pinkan.12f3b2a120b42a1c8628.png" alt="pinkan-logo"
                height="100px">
            </td>
          </tr>
          <tr>
            <td class="container-padding content" align="left"
              style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">
              <br>

              <div class="title"
                style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;color:#F178B6">Isi Ulang
                Tabung Customer</div>
              <br>

              <div class="body-text"
                style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333">
                Dear Agen <b>${agentName}</b>
                <br><br>

                Saat ini terdapat <b>${consumerCount}</b> customer yang membutuhkan pengisian ulang tabung :
                <ol>
                  <!-- start loop list cust -->
                  ${consumerList}
                  <!-- end loop list cust -->
                </ol>
                Silahkan untuk menghubungi customer di atas untuk melakukan pengisian ulang tabung.
                <br><br>

                <a href="https://pinkan.id/" target="_blank"
                  style="border-radius: 4px; background-color: #F178B6; padding: 12px; border: none; color: white; font-weight: 600; -webkit-appearance: button; -moz-appearance: button; appearance: button; text-decoration: none;">
                  Akses Website
                </a>
                <br><br>
              </div>

            </td>
          </tr>
          <tr>
            <td class="container-padding footer-text" align="left"
              style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px">
              <br>
              Copyright: © 2023 PinkanId.
              <br><br>

              <!-- You are receiving this email because you opted in on our website. Update your <a href="#"
                style="color:#aaaaaa">email preferences</a> or <a href="#" style="color:#aaaaaa">unsubscribe</a>.
              <br><br>

              <strong>Acme, Inc.</strong><br>
              <span class="ios-footer">
                123 Main St.<br>
                Springfield, MA 12345<br>
              </span>
              <a href="http://www.acme-inc.com" style="color:#aaaaaa">www.acme-inc.com</a><br>

              <br><br> -->

            </td>
          </tr>
        </table>
        <!--/600px container -->


      </td>
    </tr>
  </table>
  <!--/100% background wrapper-->

</body>

</html>
`