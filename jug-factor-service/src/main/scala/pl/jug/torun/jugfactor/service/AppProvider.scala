package pl.jug.torun.jugfactor.service

import com.typesafe.config.ConfigFactory
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.ServletHolder
import org.eclipse.jetty.webapp.WebAppContext
import org.scalatra.CorsSupport
import org.slf4j.LoggerFactory
import pl.jug.torun.jugfactor.service.data.DataModule
import pl.jug.torun.jugfactor.service.web.WebModule

object AppProvider extends App with WebModule with DataModule {
   val logger = LoggerFactory.getLogger(getClass)
   val config = ConfigFactory.load()
   val server = new Server(config.getInt("http.port"))
   val webCtx = new WebAppContext()
   webCtx.setContextPath(config.getString("http.path"))
   webCtx.setResourceBase("/WEB-INF")
   webCtx.addServlet(new ServletHolder(presentationController), "/presentation/*")
   webCtx.addServlet(new ServletHolder(annotationEventController), "/annotationEvent/*")

   server.setHandler(webCtx)
   server.start
   logger.info("Server started.")
   server.join
 }
