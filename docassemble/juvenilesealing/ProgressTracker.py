from docassemble.base.util import set_progress, Individual, DAObject

class ProgressTracker:
  """
    Progress bar shinanigans class to reduce amount of
    variables... created? Changed? Directly in the flow block.
    Not sure if this actually follows the spirit of the instructions
    given, but I'm unclear on the exact meaning of those.
    Not sure if this is better than before.
    
    @param {int} num_pages Number of total pages in the
        interview
  """
  def __init__ ( self, num_pages ):
    self.num_pages = num_pages

    # for having a progress val for first question?
    self.num_pages += 1
    self.step_num = 1

    self.step_value = 100/self.num_pages

  def do_progress ( self, step_num ):
    progress_percent = self.step_value * step_num
    set_progress( progress_percent )
    return progress_percent

  def start ( self ):
    self.step_num = 1
    self.do_progress( self.step_num )

  def increment ( self ):
    self.step_num += 1
    self.do_progress( self.step_num )
    return self.step_num
