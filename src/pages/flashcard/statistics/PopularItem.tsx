import { Divider, Grid, Typography } from '@mui/material';
import { colors } from 'theme';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

function PopularItem({ hideDivider = false }: { hideDivider: boolean }) {
  return (
    <Grid item xs={12}>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ fontSize: '14px', fontWeight: 600 }}
              >
                Bajaj Finery
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    4.3{' '}
                    <StarIcon sx={{ fontSize: '16px', mt: '-2px', color: colors.orange[300] }} />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'success.dark',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            1000 <PersonIcon sx={{ fontSize: '16px' }} />
          </Typography>
        </Grid>
      </Grid>
      {!hideDivider && <Divider sx={{ my: 1.5 }} />}
    </Grid>
  );
}

export default PopularItem;
