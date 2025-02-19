import { Box, Card, CardContent, Skeleton } from "@mui/material";

export function DogItemSkeleton() {
  return (
    <Card elevation={1}>
      <Skeleton variant="rectangular" height={240} animation="wave" />
      <CardContent sx={{ p: 0, "&:last-child": { pb: 1 } }}>
        <Box sx={{ py: 1, px: 2 }}>
          <Skeleton width="50%" height={35} animation="wave" />
        </Box>
        <Box sx={{ py: 1, px: 2 }}>
          <Skeleton width="50%" height={25} animation="wave" />
          <Skeleton height={50} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
}

export function PaginationSkeleton() {
  return <Skeleton width="50%" height={50} animation="wave" />;
}

export function SortSkeleton() {
  return <Skeleton width="30%" height={70} animation="wave" />;
}

export function FilterSkeleton() {
  return <Skeleton width="20%" height={35} animation="wave" />;
}

export function MatchTextSkeleton() {
  return <Skeleton width="50%" height={60} animation="wave" />;
}